# Drum Beat Repo back-end

## Run

Run mongo db & mongo express

```docker-compose up```

```sbt run```

## Execute the tests

```docker-compose up```

```sbt test```

## Useful links

- Drum Beat Database in express : 
http://localhost:8081/db/drum-beat-database/
- Get genres api : http://localhost:9000/genres/

## Coverage

- Run coverage
  - ``sbt coverage test``
- Generate report
  - ``sbt coverageReport``


## How to build docker image

Build image

``` docker build -t drum-beat-repo-app-image . ```

``` docker build --build-arg API_KEY='<YOURAPIKEY>' -t drum-beat-repo-app-image . ```

Run a container with this image

``` docker run -p 9000:9000 -it drum-beat-repo-app-image ```

