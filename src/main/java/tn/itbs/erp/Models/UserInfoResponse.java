package tn.itbs.erp.Models;

public class UserInfoResponse {
    private Long id;
    private String username;
    private String email;
    private String name;
    private String adresse;
    private String numTel;
    private String token;

    // Constructor
    public UserInfoResponse(Long id, String username, String email, String name, String adresse, String numTel, String token) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.name = name;
        this.adresse = adresse;
        this.numTel = numTel;
        this.token = token;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getNumTel() {
        return numTel;
    }

    public void setNumTel(String numTel) {
        this.numTel = numTel;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
