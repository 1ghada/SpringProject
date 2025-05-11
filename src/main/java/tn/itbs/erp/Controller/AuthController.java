package tn.itbs.erp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import tn.itbs.erp.Models.LoginRequest;
import tn.itbs.erp.Models.SignupRequest;
import tn.itbs.erp.Models.User;
import tn.itbs.erp.Models.UserInfoResponse;
import tn.itbs.erp.Repository.UserRepository;
import tn.itbs.erp.Security.Jwt.JwtUtils;
import tn.itbs.erp.Service.UserDetailsImpl;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials="true")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        // Authentification en utilisant l'email et le mot de passe
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        // Mettre l'authentification dans le contexte de sécurité
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Récupérer les détails de l'utilisateur authentifié
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Générer un JWT pour l'utilisateur
        String jwt = jwtUtils.generateJwtToken(userDetails);

        // Créer la réponse avec les informations de l'utilisateur et le JWT
        UserInfoResponse userInfoResponse = new UserInfoResponse(
            userDetails.getId(),
            userDetails.getUsername(),
            userDetails.getEmail(),
            userDetails.getName(),
            userDetails.getAdresse(),
            userDetails.getNumTel(),
            jwt // Le JWT est maintenant passé au constructeur
        );

        // Retourner la réponse avec les informations de l'utilisateur et le JWT
        return ResponseEntity.ok(userInfoResponse);
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body("Erreur : Ce nom d'utilisateur est déjà pris !");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Erreur : Cet email est déjà utilisé !");
        }

        // Créer un nouvel utilisateur avec mot de passe encodé
        User user = new User(
            signUpRequest.getUsername(),
            signUpRequest.getEmail(),
            encoder.encode(signUpRequest.getPassword()),  // Important : encoder le mot de passe
            signUpRequest.getName(),
            signUpRequest.getNumTel(),
            signUpRequest.getAdresse()
        );

        userRepository.save(user);

        return ResponseEntity.ok("Utilisateur enregistré avec succès !");
    }
}
