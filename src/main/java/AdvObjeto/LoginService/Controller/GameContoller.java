    package AdvObjeto.LoginService.Controller;

    import AdvObjeto.LoginService.DTO.UsuarioDTO;
    import AdvObjeto.LoginService.Model.Jogador;
    import AdvObjeto.LoginService.Model.Usuario;
    import AdvObjeto.LoginService.Service.JogadorService;
    import AdvObjeto.LoginService.Service.UsuarioService;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.stereotype.Controller;
    import org.springframework.web.bind.annotation.*;

    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;

    @Controller
    @RequestMapping("/jogo")
    @CrossOrigin(origins = "*")
    public class GameContoller {

        private UsuarioService usuarioService;
        private final JogadorService jogadorService;

        public GameContoller(UsuarioService usuarioService, JogadorService jogadorService) {
            this.usuarioService = usuarioService;
            this.jogadorService = jogadorService;
        }

        @GetMapping("/jogo")
        public String jogo() {
            return "forward:/AdivinheOObjetoHTML/AdivinheOObjeto.html";
        }

        @PostMapping("/iniciar")
        public ResponseEntity<Jogador> iniciar(@RequestBody Jogador jogador) {
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

        @PostMapping("/pontuacao")
        public ResponseEntity<?> salvarPontuacao(
                @RequestParam("id") Long id,
                @RequestParam("pontuacao") Integer pontuacao) {

            usuarioService.salvarPontuacao(id, pontuacao);
            return ResponseEntity.ok().build();
        }


        @GetMapping("/mostrarpontuacao")
        public ResponseEntity<List<UsuarioDTO>> mostrarPontuacao() {
            List<UsuarioDTO> ranking = usuarioService.listarUsuariosOrdenadosPorPontuacao();
            return ResponseEntity.ok(ranking);
        }

    }



