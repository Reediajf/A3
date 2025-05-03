package AdvObjeto.LoginService.Controller;

import AdvObjeto.LoginService.DTO.UsuarioDTO;
import AdvObjeto.LoginService.Service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuarios")
public class ConfigController {

    private final UsuarioService usuarioService;

    public ConfigController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<UsuarioDTO> mostrarUsuarios() {
        return usuarioService.listarUsuarios().stream()
                .map(usuario -> new UsuarioDTO(
                        usuario.getId(),
                        usuario.getNome(),
                        usuario.getPontuacao()
                ))
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable long id) {
        usuarioService.deletarUsuario(id);
    }

    @PutMapping("/{id}")
    public void alterarUsuario(@PathVariable long id, @RequestBody UsuarioDTO dto) {
        usuarioService.alterarUsuario(id, dto.getNome(), dto.getPontuacao());
    }
}
