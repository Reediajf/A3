package AdvObjeto.LoginService.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioDTO {
    private Long id;
    private String nome;
    private int pontuacao;

    public UsuarioDTO(Long id, String nome, int pontuacao) {
        this.id = id;
        this.nome = nome;
        this.pontuacao = pontuacao;
    }
}