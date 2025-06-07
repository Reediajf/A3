package AdvObjeto.LoginService.Model;


import AdvObjeto.LoginService.Controller.AutenticacaoControler;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Jogador {

    private String nome;

    private int pontuacao = 0;


}
