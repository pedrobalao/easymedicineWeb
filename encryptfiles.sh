tar cvf envs.tar .env.dev .env.prod .env.test
travis encrypt-file envs.tar