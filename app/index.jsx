import { useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter();
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/tabs/home"); // Redirect to home
    } catch (error) {
      Alert.alert("Login failed", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.appTitle}>Narrato</Text>
      <Text style={styles.heading}>Welcome Back</Text>
      <Text style={styles.subHeading}>
        Log in to continue writing and sharing your novels.
      </Text>

      <View style={styles.form}>
        <TextInput placeholder="Email" keyboardType="email-address" style={styles.input} placeholderTextColor="#9ca3af" value={email} onChangeText={setEmail} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} placeholderTextColor="#9ca3af" value={password} onChangeText={setPassword} />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

    
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      </TouchableOpacity>

     
      <View style={styles.dividerWrapper}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

     
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialButtonText}>Continue with Facebook</Text>
      </TouchableOpacity>

     
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signUpText} onPress={() => router.push('/signup')}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#4f46e5",
    textAlign: "center",
    marginBottom: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 15,
    color: "#6b7280",
    marginBottom: 28,
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#f9fafb",
  },
  loginButton: {
    backgroundColor: "#4f46e5",
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  forgotPassword: {
    marginTop: 16,
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    color: "#4f46e5",
    fontSize: 14,
    fontWeight: "500",
  },
  dividerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#d1d5db",
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#6b7280",
  },
  socialButton: {
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 16,
    paddingVertical: 14,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  socialButtonText: {
    fontSize: 16,
    color: "#374151",
  },
  footer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    color: "#6b7280",
    fontSize: 15,
  },
  signUpText: {
    color: "#4f46e5",
    fontWeight: "600",
    fontSize: 15,
  },
});
