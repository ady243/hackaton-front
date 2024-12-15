const apiService = {
    async fetchWithAuth(endpoint: string, options: RequestInit = {}, token: string | null) {
      if (!token) {
        throw new Error("No token provided");
      }
  
      const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
  
      try {
        const response = await fetch(endpoint, { ...options, headers });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
        }
  
        return await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(`API Error [${endpoint}]:`, error.message);
        throw error;
      }
    },

    async postFormDataWithAuth(url: string, formData: FormData, token: string | null) {
        if (!token) {
          throw new Error("Token is missing");
        }
    
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
    
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }
    
        return response.json();
    },
  };
  
  export default apiService;
  