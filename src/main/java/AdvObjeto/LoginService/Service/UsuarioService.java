package AdvObjeto.LoginService.Service;

import AdvObjeto.LoginService.DTO.UsuarioDTO;
import AdvObjeto.LoginService.Model.Usuario;
import AdvObjeto.LoginService.Repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private BCryptPasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = new BCryptPasswordEncoder ();
    }

    public Usuario registrarUsuario(Usuario usuario) {
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }
    public Optional<Usuario> findById(long id) {
        return usuarioRepository.findById(id);
    }

     public Optional<Usuario> findByNome (String Nome) {
        return usuarioRepository.findByNome(Nome);
     }

    public void alterarUsuario(long id, String nome, int pontuacao) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));

        usuario.setNome(nome);
        usuario.setPontuacao(pontuacao);

        usuarioRepository.save(usuario);
    }

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public void salvarPontuacao (long id, int pontuacao) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));
        usuario.setPontuacao(usuario.getPontuacao() + pontuacao );
        usuarioRepository.save(usuario);

    }


    public void deletarUsuario(long id) {
        usuarioRepository.deleteById(id);
    }


    public List<UsuarioDTO> listarUsuariosOrdenadosPorPontuacao() {
        return usuarioRepository.findAll().stream()
                .sorted((u1, u2) -> Integer.compare(u2.getPontuacao(), u1.getPontuacao()))
                .map(usuario -> new UsuarioDTO(
                        usuario.getId(),
                        usuario.getNome(),
                        usuario.getPontuacao()
                ))
                .collect(Collectors.toList());
    }

}

