package AdvObjeto.LoginService.DTO;


import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UsuarioDTO {
    private long id;
    private String nome;
    private int pontuacao;


    public UsuarioDTO() {
    }

    public UsuarioDTO(long id, String nome, int pontuacao) {
        this.id = id;
        this.nome = nome;
        this.pontuacao = pontuacao;
    }


}