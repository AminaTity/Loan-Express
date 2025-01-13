// lib/api.js

/**
 * Pour une requête GET sur l'API
 */
export const fetchData = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/endpoint`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Erreur lors de la récupération des données");
        }

        return response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error.message);
        throw error;
    }
};


/**
 * Pour une requête POST pour l'inscription sur l'API
 */
export const registerUser = async (userData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/inscription/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erreur lors de l'inscription");
      }

      // Si la requête est un succès
      return response.json();
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.message);
      throw error;
    }
  };


  export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}), // Convertit les données de connexion en JSON
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Erreur lors de la connexion");
        }

        // Retourne la réponse JSON, qui peut inclure un jeton ou d'autres infos
        return response.json();
    } catch (error) {
        console.error("Erreur lors de la connexion :", error.message);
        throw error;
    }
};


export const defineRole = async (role, token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/role/`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({role}), // Convertir les données de connexion en JSON
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Erreur lors de la connexion");
        }

        // Retourne la réponse JSON, qui peut inclure un jeton ou d'autres infos
        return response.json();
    } catch (error) {
        console.error("Erreur lors de la connexion :", error.message);
        throw error;
    }
};

export const createEmprunt = async (formData, token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/createLoan/`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Convertir les données de connexion en JSON
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Erreur lors de la création du prêt");
        }

        // Retourne la réponse JSON, qui peut inclure un jeton ou d'autres infos
        return response.json();
    } catch (error) {
        console.error("Erreur lors de l'envoi :", error.message);
        throw error;
    }
};


export const createInvest = async (formData, token) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/createInvest/`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Convertir les données de connexion en JSON
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Erreur lors de la création de l'investissement");
        }

        // Retourne la réponse JSON, qui peut inclure un jeton ou d'autres infos
        return response.json();
    } catch (error) {
        console.error("Erreur lors de l'envoi :", error.message);
        throw error;
    }
};


export const getUserInfo = async () => {
    try {
        
            const [userInfo, setUserInfo] = useState(null);
        
            useEffect(() => {
                const storedUserInfo = localStorage.getItem("userInfo");
                if (storedUserInfo) {
                    setUserInfo(JSON.parse(storedUserInfo)); // Parse les infos de l'utilisateur
                }
                
            }, []);
            return userInfo;
    } catch (error) {
        console.error("Erreur lors de la récupération des informations utilisateur :", error);
        throw error;
    }
};
