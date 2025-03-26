package AdvObjeto.LoginService.Repository;

import AdvObjeto.LoginService.Model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByNome ( String nome );
}
