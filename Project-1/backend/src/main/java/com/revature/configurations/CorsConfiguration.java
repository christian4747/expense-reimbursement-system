package com.revature.configurations;

import static org.springframework.http.HttpMethod.*;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
@EnableWebMvc
public class CorsConfiguration implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")
                .allowedMethods(
                        GET.name(),
                        POST.name(),
                        PUT.name(),
                        DELETE.name()
                );
    }
}