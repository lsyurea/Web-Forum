
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;


-- Set structure 

------------------------------------------------------------------------------------------------------------
-- genres structure
CREATE TABLE public.genres (
    id integer NOT NULL,
    genre character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.genres ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.genres_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

-- users structure

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255),
    password character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
-- posts structure

CREATE TABLE public.posts (
    id integer NOT NULL,
    title character varying(512),
    content text,
    image character varying(255),
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.posts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

-- posts_genres_users structure (relationship between posts and genres and users)

CREATE TABLE public.posts_users (
    id integer NOT NULL,
    post_id integer,
    user_id integer
);

ALTER TABLE public.posts_users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.posts_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE public.posts_genres (
    id integer NOT NULL,
    post_id integer,
    genre_id integer
);


ALTER TABLE public.posts_genres ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.posts_genres_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

------------------------------------------------------------------------------------------------------------

-- Fill data


-- genres data

COPY public.genres (id, genre, created_at, updated_at) FROM stdin;
1	Comedy	2022-12-23 00:00:00	2022-12-23 00:00:00
2	Sci-Fi	2022-12-23 00:00:00	2022-12-23 00:00:00
3	Horror	2022-12-23 00:00:00	2022-12-23 00:00:00
4	Romance	2022-12-23 00:00:00	2022-12-23 00:00:00
5	Action	2022-12-23 00:00:00	2022-12-23 00:00:00
6	Thriller	2022-12-23 00:00:00	2022-12-23 00:00:00
7	Drama	2022-12-23 00:00:00	2022-12-23 00:00:00
8	Mystery	2022-12-23 00:00:00	2022-12-23 00:00:00
9	Crime	2022-12-23 00:00:00	2022-12-23 00:00:00
10	HighSchool	2022-12-23 00:00:00	2022-12-23 00:00:00
11	Adventure	2022-12-23 00:00:00	2022-12-23 00:00:00
12	Fantasy	2022-12-23 00:00:00	2022-12-23 00:00:00
13	Superhero	2022-12-23 00:00:00	2022-12-23 00:00:00
\.


-- posts data

COPY public.posts (id, title, content, image, created_at, updated_at) FROM stdin;
1	Classroom of the Elite	Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil nulla sunt iusto quibusdam velit veniam consequuntur neque nisi? Officia accusamus quis, aliquam consectetur ipsum vitae voluptatibus alias tempore animi reprehenderit.	https://picsum.photos/200/300	2022-12-23 00:00:00	2022-12-23 00:00:00
2	Horimiya	Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil nulla sunt iusto quibusdam velit veniam consequuntur neque nisi? Officia accusamus quis, aliquam consectetur ipsum vitae voluptatibus alias tempore animi reprehenderit.	https://picsum.photos/200/300	2022-12-23 00:00:00	2022-12-23 00:00:00
3	SPYxFAMILY	Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil nulla sunt iusto quibusdam velit veniam consequuntur neque nisi? Officia accusamus quis, aliquam consectetur ipsum vitae voluptatibus alias tempore animi reprehenderit.	https://picsum.photos/200/300	2022-12-23 00:00:00	2022-12-23 00:00:00
\.

-- User data

COPY public.users (id, username, password, created_at, updated_at) FROM stdin;
1	admin	$2a$10$IaezaSlSZMOiVhlfa.ST2eWd47POSLIztZykmz0Q0AbaLhagRB0Fe	2022-12-23 00:00:00	2022-12-23 00:00:00
\.

-- posts_users data (Relationship between posts and users) created by admin
COPY public.posts_users (id, post_id, user_id) FROM STDIN WITH (FORMAT CSV, HEADER FALSE);
1,1,1
2,2,1
3,3,1
\.

-- posts_genres data (Relationship between posts and genres) created by admin

COPY public.posts_genres (id, post_id, genre_id) FROM STDIN WITH (FORMAT CSV, HEADER FALSE);
1,1,5
2,1,10
3,2,4
4,2,10
5,3,11
6,3,1
\.





------------------------------------------------------------------------------------------------------------


-- Initial ID counter values after all the populated values

SELECT pg_catalog.setval('public.posts_id_seq', 3, true);

SELECT pg_catalog.setval('public.users_id_seq', 1, true);

SELECT pg_catalog.setval('public.genres_id_seq', 13, true);

SELECT pg_catalog.setval('public.posts_genres_users_id_seq', 6, true);


------------------------------------------------------------------------------------------------------------

-- Fixes the primary key constraints of posts, posts_genres_users, and users
ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.posts_genres_users
    ADD CONSTRAINT posts_genres_users_pkey PRIMARY KEY (id);

------------------------------------------------------------------------------------------------------------

-- Add relationship between posts and genres and users
ALTER TABLE ONLY public.posts_genres
    ADD CONSTRAINT posts_genres_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public.posts_genres
    ADD CONSTRAINT posts_genres_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public.genres(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public.posts_users
    ADD CONSTRAINT posts_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public.posts_users
    ADD CONSTRAINT posts_users_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;

------------------------------------------------------------------------------------------------------------