INSERT INTO users (id, email, username, password, first_name, last_name)
VALUES (0, 'daniel@u.com', 'danielj', '999','Catalin Daniel','Jecu');


INSERT INTO projects (id, name)
VALUES (0, 'Personal'),
       (1, 'Work Project');

INSERT INTO project_users (id, project_id, user_id)
VALUES (0, 0, 0),
       (1, 1, 0);


INSERT INTO task_lists (id, name, project_id)
VALUES (0, 'DB tasks', 1),
       (1, 'API tasks', 1),
       (2, 'FE tasks', 1),
       (3, 'Home tasks', 0),
       (4, 'Chores tasks', 0);

INSERT INTO tasks (id, title, description, task_list_id, task_status_id)
VALUES (0, 'erd database', 'Ladies Gaelic Football', 0, 1);


INSERT INTO tasks (id, title, description, task_list_id, task_status_id)
VALUES (1, 'router validation', 'Ladies Gaelic Football',1,  2 ),
       (2, 'api', 'Ladies Gaelic Football', 1, 1),
       (3, 'frontend', 'Ladies Gaelic Football', 2, 1);
