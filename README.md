# Load Balance Example
## Introduction
This project was created to demonstrate how load balancing works using Nginx.

## How to run
To run this project, you need use `docker`:
 ```bash
 docker compose build
 docker compose up
 ```

 This will enable the port 8080. To send a request, use the `/` endpoint:
 ```bash
 curl http://localhost:8080
 ```

You can use a performance testing tool, like `hey`, to send multiple requests. This approach is better for analyzing the full capabilities of load balancing. Example:

```bash
hey -z 30s http://localhost:8080
```

 For each request, a log is created inside the container showing the `PodNumber` and the total of request, like this:
 ```
 Pod #1 total of 3 requests
 ```

 ## What's to do
 ### Testing Nginx configurations
Use this application to test different Nginx configurations. To do this, modify the `load-balance/default.conf.template` file with your desired configuration, such as setting a container as a backup:
 ```
 upstream backend {
  server app0:3000 max_fails=3 fail_timeout=30s;
  server app1:3000 max_fails=3 fail_timeout=30s;
  server app2:3000 backup;
}
...
 ```
 Check [here](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/) all options available

 ## Testing the high availability 
This is a valuable test to perform. Shut down one of the application containers and send multiple requests to the application. A high success rate is expected. Nginx should redirect requests only to healthy containers:
```
docker container stop load-balance-app1-1
hey -z 30s http://localhost:8080 
``` 
Result:
```
Status code distribution:
  [200] 36392 responses

Error distribution:
  [8]   Get http://localhost:8080: net/http: request canceled (Client.Timeout exceeded while awaiting headers)
```
After receiving 8 errors, Nginx redirected all subsequent requests to the other healthy containers.


## Conclusion
If you liked this project, let me know how you used it and what tests you performed with Nginx! I’d love to hear from you.