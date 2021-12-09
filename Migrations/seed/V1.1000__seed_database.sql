INSERT INTO users (id, email, username, password)
VALUES (0, 'danu.com', 'dan', '999');


INSERT INTO projects (id, name)
VALUES (0, 'Personal'),
       (1, 'Work Project');

INSERT INTO project_users (id, project_id, user_id)
VALUES (0, 0,0 ),
       (1, 1, 0);


INSERT INTO task_lists (id, name, project_id)
VALUES (0, 'DB tasks', 1),
       (1, 'API tasks', 1),
       (2, 'FE tasks', 1);

INSERT INTO tasks (id, title, description)
VALUES (0, 'erd database', 'Ladies Gaelic Football');

INSERT INTO tasks (id, title, description, task_list_id, task_status_id)
VALUES (1, 'erd diagram', 'Ladies Gaelic Football',1,  2 );
