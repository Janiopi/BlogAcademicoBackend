--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)

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

--
-- Name: answers; Type: TABLE; Schema: public; Owner: janio
--

CREATE TABLE public.answers (
    id integer NOT NULL,
    question_id integer,
    user_id integer,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.answers OWNER TO janio;

--
-- Name: answers_id_seq; Type: SEQUENCE; Schema: public; Owner: janio
--

CREATE SEQUENCE public.answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.answers_id_seq OWNER TO janio;

--
-- Name: answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: janio
--

ALTER SEQUENCE public.answers_id_seq OWNED BY public.answers.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: janio
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    answer_id integer,
    user_id integer,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.comments OWNER TO janio;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: janio
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO janio;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: janio
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: courses; Type: TABLE; Schema: public; Owner: janio
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    teacher character varying(255) NOT NULL,
    tags jsonb,
    description text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.courses OWNER TO janio;

--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: janio
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.courses_id_seq OWNER TO janio;

--
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: janio
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: janio
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    user_id integer,
    title text NOT NULL,
    description text NOT NULL,
    tags text[],
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    slug text
);


ALTER TABLE public.questions OWNER TO janio;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: janio
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.questions_id_seq OWNER TO janio;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: janio
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: resources; Type: TABLE; Schema: public; Owner: janio
--

CREATE TABLE public.resources (
    id integer NOT NULL,
    course_id integer NOT NULL,
    type character varying(50) NOT NULL,
    url text NOT NULL,
    title character varying(255),
    uploaded_by character varying(255),
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.resources OWNER TO janio;

--
-- Name: resources_id_seq; Type: SEQUENCE; Schema: public; Owner: janio
--

CREATE SEQUENCE public.resources_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.resources_id_seq OWNER TO janio;

--
-- Name: resources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: janio
--

ALTER SEQUENCE public.resources_id_seq OWNED BY public.resources.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: janio
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(200) NOT NULL,
    email character varying(200) NOT NULL,
    password character varying(200),
    google_id character varying,
    provider character varying DEFAULT 'local'::character varying
);


ALTER TABLE public.users OWNER TO janio;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: janio
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO janio;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: janio
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: votes; Type: TABLE; Schema: public; Owner: janio
--

CREATE TABLE public.votes (
    id integer NOT NULL,
    user_id integer,
    question_id integer,
    answer_id integer,
    vote_type integer NOT NULL
);


ALTER TABLE public.votes OWNER TO janio;

--
-- Name: votes_id_seq; Type: SEQUENCE; Schema: public; Owner: janio
--

CREATE SEQUENCE public.votes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.votes_id_seq OWNER TO janio;

--
-- Name: votes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: janio
--

ALTER SEQUENCE public.votes_id_seq OWNED BY public.votes.id;


--
-- Name: answers id; Type: DEFAULT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.answers ALTER COLUMN id SET DEFAULT nextval('public.answers_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: resources id; Type: DEFAULT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.resources ALTER COLUMN id SET DEFAULT nextval('public.resources_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: votes id; Type: DEFAULT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.votes ALTER COLUMN id SET DEFAULT nextval('public.votes_id_seq'::regclass);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: resources resources_pkey; Type: CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: votes votes_pkey; Type: CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (id);


--
-- Name: votes votes_user_id_question_id_answer_id_key; Type: CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_user_id_question_id_answer_id_key UNIQUE (user_id, question_id, answer_id);


--
-- Name: answers answers_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE;


--
-- Name: answers answers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: comments comments_answer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_answer_id_fkey FOREIGN KEY (answer_id) REFERENCES public.answers(id) ON DELETE CASCADE;


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: questions questions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: resources resources_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: votes votes_answer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_answer_id_fkey FOREIGN KEY (answer_id) REFERENCES public.answers(id);


--
-- Name: votes votes_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id);


--
-- Name: votes votes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: janio
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: janio
--

GRANT ALL ON TABLE public.users TO janiopi;


--
-- PostgreSQL database dump complete
--

