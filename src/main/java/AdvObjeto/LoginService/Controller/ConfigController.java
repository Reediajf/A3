package AdvObjeto.LoginService.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/config")
public class ConfigController {

    @GetMapping
    public String configPage() {
        return "Você acessou a página de configuração! (Apenas para usuários autenticados)";
    }
}
