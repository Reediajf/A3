package AdvObjeto.LoginService.Repository;

import AdvObjeto.LoginService.Model.Usuario;
import org.hibernate.sql.Update;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByNome ( String nome );
}
