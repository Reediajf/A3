package AdvObjeto.LoginService.Controller;

import AdvObjeto.LoginService.DTO.UsuarioDTO;
import AdvObjeto.LoginService.Model.Usuario;
import AdvObjeto.LoginService.Service.UsuarioService;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AutenticacaoControler {
    private final UsuarioService usuarioService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    public AutenticacaoControler( UsuarioService usuarioService ) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioDTO> login(@RequestBody Usuario usuario) {
        Optional<Usuario> usuarioLogin = usuarioService.findByNome(usuario.getNome());

        if (usuarioLogin.isPresent() && passwordEncoder.matches(usuario.getSenha(), usuarioLogin.get().getSenha())) {
            UsuarioDTO dto = new UsuarioDTO();
            dto.setNome(usuarioLogin.get().getNome());
            dto.setId(usuarioLogin.get().getId());
            System.out.println(dto.getId());
            return ResponseEntity.ok(dto);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }



}
