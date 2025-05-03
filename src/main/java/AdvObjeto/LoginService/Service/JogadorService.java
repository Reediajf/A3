package AdvObjeto.LoginService.Service;

import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

@Service
public class JogadorService {
    private ArrayList<String> primeiroNome = new ArrayList<>(Arrays.asList(
            "Leão", "Rato", "Azul", "Estrela", "Nuvem", "Brisa", "Tigre", "Lobo", "Falcão", "Sol",
            "Lua", "Pinguim", "Mar", "Fogo", "Neve", "Vento", "Sombra", "Espada", "Pérola", "Flor"
    ));

    private ArrayList<String> ultimoNome = new ArrayList<>( Arrays.asList(
            "Dourado", "Prateado", "Veloz", "Brilhante", "Saltitante", "Misterioso", "Cantante", "Sorridente", "Voador", "Encantado",
            "Corajoso", "Brincalhão", "Saltador", "Feroz", "Alegre", "Sonhador", "Luminoso", "Mágico", "Radiante", "Vibrante"
    ));

    private  String nome;
    private  String sobrenome;
    private String nomeFinal;



    public String gerarNome() {
        int random = new Random().nextInt(1, 2);
        if (random == 0) {
            nome = primeiroNome.get(random);
            sobrenome = ultimoNome.get(random);
            nomeFinal = nome + " " + sobrenome;

            return nomeFinal;
        } else {
            nome = ultimoNome.get(random);
            sobrenome = primeiroNome.get(random);
            nomeFinal = nome + " " + sobrenome;

            return nomeFinal;
        }
    }


}
