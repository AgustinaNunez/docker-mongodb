A docker to run a MongoDB locally and populate the DB with some initial data.
# Requirements
- Docker
- Bash or something similar to run the commands
# Usage
1. Clone the project
2. Run the following command from the project folder
   ```
   docker-compose up
   ```

To add new data to the DB:
1. Stop the docker process (Ctrl + C) and remove the volumes created
   ```
   docker-compose down --volumes
   ```
2. Save changes on *index.js* and run it again:
   ```
   docker-compose up
   ```

The string connection should look like this:
**mongodb://root:root@127.0.0.1:27017/**
