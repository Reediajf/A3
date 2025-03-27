package AdvObjeto.LoginService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SegurancaConfiguracoes {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Desabilita CSRF
                .csrf(AbstractHttpConfigurer::disable)

                // Configura CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // Configura cabeçalhos para permitir iframes
                .headers(headers -> headers
                        .frameOptions(frameOptions -> frameOptions.sameOrigin ())
                )

                // Configura autorização de requisições
                .authorizeHttpRequests(auth -> auth
                        // Permite acesso público a recursos estáticos
                        .requestMatchers("/", "/index.html", "/error").permitAll()
                        .requestMatchers("/static/**").permitAll()
                        .requestMatchers("/AdivinheOObjetoHTML/**").permitAll()
                        .requestMatchers("/*.html", "/*.js", "/*.css").permitAll()
                        .requestMatchers("/css/**", "/js/**", "/images/**").permitAll()

                        // Permite todos os outros acessos
                        .anyRequest().permitAll()
                );

        return http.build();
    }

    // Bean para codificação de senhas
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configuração CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}