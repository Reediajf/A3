package AdvObjeto.LoginService.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class GameContoller {

    @GetMapping("/jogo")
    public String jogo() {
        return "forward:/AdivinheOObjetoHTML/AdivinheOObjeto.html";
    }

    @PostMapping ("/pontuacao")
    public ResponseEntity<String> receberPontuacao( @RequestBody Map<String, Object> dados) {
            String jogador = (String) dados.get("jogador");
            Integer pontuacao = (Integer) dados.get("pontuacao");
            return ResponseEntity.ok("Pontuação recebida com sucesso!");
    }
}



