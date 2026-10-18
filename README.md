# todos_app

React.js · Node.js · Prisma ORM · Neon · Render · AWS S3 · CloudFront · Route 53 · GitHub Actions

Personal project for learning full-stack development and cloud deployment. Topics covered:

- Database design (ERD, cardinality, normalisation)
- Database migrations with Flyway
- Node.js REST API with Express, Prisma ORM, JWT auth
- React application with MUI, React Router, Axios
- Open API Spec / Swagger
- Docker & Docker Compose (local dev)
- CI/CD with GitHub Actions
- AWS: S3, CloudFront, Route 53
- Serverless Postgres with Neon
- API hosting on Render

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 17, TypeScript, MUI v5, styled-components |
| Backend | Node.js 20, Express, Prisma ORM, JWT |
| Database | Neon (serverless Postgres) |
| API host | Render (free tier) · `todos-api.jecu.eu` |
| UI host | AWS S3 + CloudFront · `todos.jecu.eu` |
| DNS | AWS Route 53 |
| CI/CD | GitHub Actions |

## Observability

Free-tier error tracking (Sentry) and structured logs (pino → Render → Grafana Cloud Loki). Nothing is sent unless you configure it. A missing DSN does not crash the API or the UI.

### Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `SENTRY_DSN` | API runtime (Render) | Sentry DSN for `@sentry/node`. Empty or unset → Sentry is skipped. |
| `REACT_APP_SENTRY_DSN` | UI **build** (GitHub Actions) | Sentry DSN for `@sentry/react` (React 17). Create React App inlines it at build time. Empty or unset → Sentry is skipped. |
| `LOG_LEVEL` | API runtime | Optional pino level (`debug`, `info`, `warn`, `error`). Defaults to `info` in production and `debug` otherwise. |

Set `SENTRY_DSN` and `LOG_LEVEL` in the Render dashboard (or via `render.yaml`; `SENTRY_DSN` is `sync: false`). Set the GitHub Actions secret `REACT_APP_SENTRY_DSN` so the S3 and GitHub Pages workflows can inline it. Do not commit DSNs or tokens.

The API writes one JSON object per line to stdout. Each request log includes `req.id` (also returned as `X-Request-Id`), `req.method`, `req.path` (query string stripped), `res.status`, and `duration` (milliseconds). Passwords, tokens, cookies, and `Authorization` headers are redacted and are never written.

`GET /health` is public (no JWT). It runs `SELECT 1` and returns `200 {"status":"ok","db":"up"}` when Postgres answers, or `503 {"status":"error","db":"down"}` when it does not. Render uses this path as `healthCheckPath`.

### Render Log Streams → Grafana Cloud Loki

Render does **not** speak Loki's HTTP push API. [Log Streams](https://render.com/docs/log-streams) forward stdout as **RFC5424 syslog over TLS** to `host:port`. An HTTPS URL that is not Datadog or Loggly is treated as syslog, so pasting the Loki push URL into Render will not work. Grafana Cloud Logs (free tier: 50 GB ingested / month, 14-day retention) accepts `POST /loki/api/v1/push` with basic auth. Bridge the two with [Grafana Alloy](https://grafana.com/docs/alloy/latest/) (open source, no license fee) on a host that can accept public TLS on a TCP port. A Render free web service cannot do this — its proxy is HTTP only.

1. Create a free Grafana Cloud stack. In the stack, open **Loki → Details** and copy the push URL (for example `https://logs-prod-XXX.grafana.net/loki/api/v1/push`) and the **User** (numeric instance id). Create an access-policy token with scope `logs:write`. That token is Alloy's basic-auth password. Keep it on Alloy only — do not put it in Render's log-stream token field, which is embedded in the syslog message.
2. Run Alloy with a config that terminates TLS (a publicly trusted certificate, such as Let's Encrypt) and forwards to Loki. Raise `max_message_length` above the 8192 default so JSON lines are not truncated:

```alloy
loki.source.syslog "render" {
  listener {
    address             = "0.0.0.0:6514"
    protocol            = "tcp"
    syslog_format       = "rfc5424"
    max_message_length  = 65536
    labels              = { job = "todos-api", source = "render" }

    tls_config {
      cert_file = "/etc/alloy/tls/fullchain.pem"
      key_file  = "/etc/alloy/tls/privkey.pem"
    }
  }

  forward_to = [loki.write.grafana_cloud.receiver]
}

loki.write "grafana_cloud" {
  endpoint {
    url = env("LOKI_PUSH_URL")

    basic_auth {
      username = env("LOKI_USER")
      password = env("LOKI_TOKEN")
    }
  }
}
```

3. In the Render Dashboard open **Integrations → Observability → Log Streams → + Set default**. Endpoint: `your-alloy-host:6514` (host and port only, no scheme). Leave the token blank unless your Alloy config validates one. Hobby workspaces can only set this default for the whole workspace; per-service overrides need a higher plan. Log-stream traffic does not count against Render usage.
4. In Grafana, open **Explore → Loki** and run `{job="todos-api"} | json`. The JSON line inside the syslog message exposes `level`, `req_method` / `req.method`, `req.path`, `res.status`, and `duration` (the exact label names follow LogQL's JSON parser).

## Deployment History

### v3 — Current (2026)
- **UI**: AWS S3 + CloudFront (`todos.jecu.eu`) — deployed via GitHub Actions on push to `main`
- **API**: Render free tier (`todos-api.jecu.eu` → `todos-api-99uw.onrender.com`)
- **DB**: Neon serverless Postgres (free tier, eu-west-2)
- **DNS**: Route 53 — A alias to CloudFront, CNAME for API subdomain

### v2 — AWS Lightsail (2022–2026)
- **API**: AWS Lightsail container service (`container-service-1.8j8useculgdf6.eu-central-1.cs.amazonlightsail.com`)
- **DB**: AWS RDS Postgres
- **UI**: AWS S3 + CloudFront

### v1 — Local / Docker Compose
- Full stack via `docker-compose up`: Postgres + Flyway migrations + Node API
- No cloud hosting

/api

/ui

/website www.jecu.eu

---

## Deployment

| Target | URL | Trigger |
|---|---|---|
| Production | https://todos.jecu.eu | push to `main` → S3 + CloudFront |
| GitHub Pages | https://danieljecu.github.io/todos_app | push to `main` → Actions |

### Local deploy scripts (from `ui/`)

```bash
npm run deploy        # build + sync to S3 + invalidate CloudFront
npm run deploy:pages  # build for GitHub Pages (PUBLIC_URL=/todos_app)
```

### Production (S3 + CloudFront)

The UI is deployed to AWS S3 + CloudFront via GitHub Actions on push to `main`.

### AWS Infrastructure

| Resource | Value |
|---|---|
| S3 Bucket | `todos.jecu.eu` (eu-central-1) |
| CloudFront Distribution | `E3RBZNK0YVAUL3` |
| ACM Certificate | `todos.jecu.eu` (us-east-1) |
| DNS | Route 53 A alias → CloudFront |

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM access key |
| `AWS_SECRET_ACCESS_KEY` | IAM secret key |
| `API_HOST` | Backend API URL |
| `CLOUDFRONT_DISTRIBUTION_ID` | `E3RBZNK0YVAUL3` |

### One-Time Infrastructure Setup (CLI)

Run these commands once to set up the subdomain from scratch.

**1. Request ACM certificate (must be us-east-1 for CloudFront)**
```bash
aws acm request-certificate \
  --region us-east-1 \
  --domain-name todos.jecu.eu \
  --validation-method DNS
# Note the CertificateArn in output
```

**2. Add DNS validation CNAME (get values from describe-certificate)**
```bash
aws acm describe-certificate --region us-east-1 \
  --certificate-arn <CertificateArn> \
  --query "Certificate.DomainValidationOptions[0].ResourceRecord"

aws route53 change-resource-record-sets \
  --hosted-zone-id <HOSTED_ZONE_ID> \
  --change-batch '{"Changes":[{"Action":"CREATE","ResourceRecordSet":{
    "Name":"<ValidationName>","Type":"CNAME","TTL":300,
    "ResourceRecords":[{"Value":"<ValidationValue>"}]}}]}'
```

**3. Create CloudFront distribution**
```bash
aws cloudfront create-distribution --distribution-config '{
  "CallerReference": "todos-jecu-eu",
  "Aliases": {"Quantity":1,"Items":["todos.jecu.eu"]},
  "DefaultRootObject": "index.html",
  "Origins": {"Quantity":1,"Items":[{
    "Id":"todos-s3",
    "DomainName":"todos.jecu.eu.s3.eu-central-1.amazonaws.com",
    "S3OriginConfig":{"OriginAccessIdentity":""}
  }]},
  "DefaultCacheBehavior": {
    "TargetOriginId":"todos-s3",
    "ViewerProtocolPolicy":"redirect-to-https",
    "CachePolicyId":"658327ea-f89d-4fab-a63d-7e88639e58f6",
    "AllowedMethods":{"Quantity":2,"Items":["GET","HEAD"],
      "CachedMethods":{"Quantity":2,"Items":["GET","HEAD"]}},
    "Compress":true
  },
  "CustomErrorResponses":{"Quantity":1,"Items":[
    {"ErrorCode":403,"ResponsePagePath":"/index.html","ResponseCode":"200","ErrorCachingMinTTL":10}
  ]},
  "ViewerCertificate":{
    "ACMCertificateArn":"<CertificateArn>",
    "SSLSupportMethod":"sni-only",
    "MinimumProtocolVersion":"TLSv1.2_2021"
  },
  "Comment":"todos.jecu.eu","Enabled":true,"HttpVersion":"http2","PriceClass":"PriceClass_100"
}'
# Note the Distribution Id and DomainName
```

**4. Create Origin Access Control and attach to distribution**
```bash
OAC_ID=$(aws cloudfront create-origin-access-control \
  --origin-access-control-config '{
    "Name":"todos-jecu-eu-oac","Description":"OAC for todos.jecu.eu",
    "SigningProtocol":"sigv4","SigningBehavior":"always",
    "OriginAccessControlOriginType":"s3"
  }' --query "OriginAccessControl.Id" --output text)

# Then update the distribution to set OriginAccessControlId = $OAC_ID
```

**5. Add S3 bucket policy**
```bash
aws s3api put-bucket-policy --bucket todos.jecu.eu --policy '{
  "Version":"2012-10-17",
  "Statement":[{"Sid":"AllowCloudFrontOAC","Effect":"Allow",
    "Principal":{"Service":"cloudfront.amazonaws.com"},
    "Action":"s3:GetObject",
    "Resource":"arn:aws:s3:::todos.jecu.eu/*",
    "Condition":{"StringEquals":{
      "AWS:SourceArn":"arn:aws:cloudfront::<ACCOUNT_ID>:distribution/<DISTRIBUTION_ID>"
    }}
  }]
}'
```

**6. Create Route 53 DNS record**
```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id <HOSTED_ZONE_ID> \
  --change-batch '{"Changes":[{"Action":"CREATE","ResourceRecordSet":{
    "Name":"todos.jecu.eu.","Type":"A",
    "AliasTarget":{
      "HostedZoneId":"Z2FDTNDATAQYW2",
      "DNSName":"<CloudFront DomainName>.",
      "EvaluateTargetHealth":false
    }
  }}]}'
```

**7. Set GitHub secrets**
```bash
REPO="danieljecu/todos_app"
gh secret set AWS_ACCESS_KEY_ID           --repo $REPO --body "<key>"
gh secret set AWS_SECRET_ACCESS_KEY       --repo $REPO --body "<secret>"
gh secret set CLOUDFRONT_DISTRIBUTION_ID  --repo $REPO --body "<distribution-id>"
```
