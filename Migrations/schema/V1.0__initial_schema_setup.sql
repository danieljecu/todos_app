CREATE TABLE IF NOT EXISTS public.users
(
    id          serial
        constraint users_pk
            primary key,
    email        text,
    username        text,
    password        text,
    first_name       text,
    last_name        text
);

CREATE TABLE IF NOT EXISTS public."projects" (
  "id" serial
          constraint projects_pk primary key,
  "name" text
);

CREATE TABLE IF NOT EXISTS public."project_users" (
  "id" serial
          constraint project_users_pk primary key,
    "project_id" integer
    constraint project_users_project_id_fk
            references public.projects,
    "user_id" integer
    constraint project_users_user_id_fk
            references public.users
);

CREATE TABLE IF NOT EXISTS public."task_lists"
(
    "id"         serial
        constraint task_lists_pk primary key,
    "name"       text,
    "project_id" integer
         constraint task_lists_project_id_fk
            references public.projects
);

CREATE TABLE IF NOT EXISTS "task_statuses" (
  "id" serial
      constraint task_statuses_pk primary key,
  "name" text NOT NULL
);

CREATE TABLE IF NOT EXISTS public."tasks"
(
    "id"             serial
        constraint tasks_pk primary key,
    "title"          text,
    "description"    text,
    "due_date"       date,
    "created_at"     timestamp,
    "comments"       text,
    "task_list_id"   integer
        constraint tasks_task_list_id_fk
            references public.task_lists,
    "task_status_id" integer
        constraint tasks_task_status_id_fk
                    references public.task_statuses
);
