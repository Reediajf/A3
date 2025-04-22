package AdvObjeto.LoginService.Controller;

import AdvObjeto.LoginService.Model.Jogador;
import AdvObjeto.LoginService.Model.Usuario;
import AdvObjeto.LoginService.Service.JogadorService;
import AdvObjeto.LoginService.Service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AutenticacaoControler {
    private final UsuarioService usuarioService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JogadorService jogadorService;

    public AutenticacaoControler( UsuarioService usuarioService, JogadorService jogadorService ) {
        this.usuarioService = usuarioService;
        this.jogadorService = jogadorService;
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Usuario usuario) {
        Optional<Usuario> usuarioLogin = usuarioService.findByNome( usuario.getNome () );
        if (usuarioLogin.isPresent() && passwordEncoder.matches(usuario.getSenha(), usuarioLogin.get().getSenha())) {
            return ResponseEntity.ok(usuarioLogin.get());
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/iniciar")
    public ResponseEntity<Jogador> iniciar( @RequestBody Jogador jogador) {
        String nome = jogadorService.gerarNome ();
        jogador.setNome(nome);
        jogador.setPontuacao(0);
        return ResponseEntity.ok(jogador);
    }

    @PostMapping("/registrar")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario) {
        try {
            Usuario usuarioRegistrado = usuarioService.registrarUsuario(usuario);
            return ResponseEntity.ok(usuarioRegistrado);
        } catch (Exception e) {
            return ResponseEntity
                    .status( HttpStatus.INTERNAL_SERVER_ERROR)
                    .body( Map.of("error", e.getMessage()));
        }
    }

}
