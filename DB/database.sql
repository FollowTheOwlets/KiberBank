create TABLE groups
(
    group_id   SERIAL PRIMARY KEY,
    group_name character(10)
);

create TABLE users
(
    user_id  character(40) PRIMARY KEY,
    login    character(30),
    password character(70),
    name     character(30),
    group_id smallint,
    coins    smallint,
    FOREIGN KEY (group_id) REFERENCES groups (group_id)
);


create TABLE tasks
(
    task_id  SERIAL PRIMARY KEY,
    date     character(12),
    text     character(255),
    group_id smallint,
    weight   smallint,
    FOREIGN KEY (group_id) REFERENCES groups (group_id)
);

create TABLE tasks_state
(
    row     SERIAL PRIMARY KEY,
    user_id character(40),
    task_id smallint,
    state   smallint,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (task_id) REFERENCES tasks (task_id)
);