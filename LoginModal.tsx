const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await fetch("YOUR_EDGE_FUNCTION_LOGIN_URL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json();
    if (res.ok) {
      toast.success("Login successful!");
      onClose(); // Close modal
      setUser(result.user); // <- pass this up to AppContent
    } else {
      toast.error(result.error);
    }
  } catch (err) {
    toast.error("Unexpected error");
  } finally {
    setLoading(false);
  }
};
