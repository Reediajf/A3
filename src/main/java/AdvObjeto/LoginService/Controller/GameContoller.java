package AdvObjeto.LoginService.Controller;

import AdvObjeto.LoginService.Repository.UsuarioRepository;
import AdvObjeto.LoginService.Service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class GameContoller {

    private UsuarioService usuarioService;
    private UsuarioRepository usuarioRepository;

    public GameContoller(UsuarioService usuarioService, UsuarioRepository usuarioRepository) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/jogo")
    public String jogo() {
        return "forward:/AdivinheOObjetoHTML/AdivinheOObjeto.html";
    }

    @PostMapping ("/pontuacao")
    public ResponseEntity<String> receberPontuacao( @RequestBody Long id, int pontuacao) {
            usuarioService.salvarPontuacao(id, pontuacao);
            return ResponseEntity.ok("Pontuação recebida com sucesso!");
    }

    @GetMapping("/mostrarpontuacao")
    public void mostrarPontuacao() {
        usuarioService.mostrarPontuacao();
    }
}



