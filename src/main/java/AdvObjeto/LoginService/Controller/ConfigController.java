package AdvObjeto.LoginService.Controller;

import AdvObjeto.LoginService.DTO.UsuarioDTO;
import AdvObjeto.LoginService.Service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/config")
public class ConfigController {


    UsuarioService usuarioService;

    public ConfigController(UsuarioService usuarioService) {

        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<UsuarioDTO> mostrarUsuarios() {
        return usuarioService.findAll().stream()
                .map(usuario -> new UsuarioDTO(
                        usuario.getId(),
                        usuario.getNome(),
                        usuario.getPontuacao()
                ))
                .collect( Collectors.toList());
    }



    @PostMapping("/deletar")
    public void deletarUsuario(@RequestParam long id) {
        usuarioService.deletarUsuario(id);
    }


    @PutMapping("/alterar")
    public void alterarUsuario(@RequestParam long id, @RequestBody UsuarioDTO dto) {
        usuarioService.alterarUsuario(id, dto.getNome(), dto.getPontuacao());
    }



}
