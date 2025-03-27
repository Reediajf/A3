package AdvObjeto.LoginService.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GameContoller {

    @GetMapping("/jogo")
    public String jogo() {
        return "forward:/AdivinheOObjetoHTML/AdivinheOObjeto.html";
    }
}
