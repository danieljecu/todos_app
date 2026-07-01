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
