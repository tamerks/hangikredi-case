import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../config/firebase';

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    let errorMessage = 'Giriş yapılırken bir hata oluştu';
    
    if (error.code) {
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Bu email adresine kayıtlı kullanıcı bulunamadı';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Şifre hatalı';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Email veya şifre hatalı';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Geçersiz email adresi';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Bu kullanıcı hesabı devre dışı bırakılmış';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Ağ hatası. İnternet bağlantınızı kontrol edin';
          break;
        default:
          errorMessage = 'Giriş yapılırken bir hata oluştu';
      }
    }
    
    return { success: false, error: errorMessage };
  }
};

export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    let errorMessage = 'Kayıt olurken bir hata oluştu';
    
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Bu email adresi zaten kullanılıyor';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Geçersiz email adresi';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Geçersiz email veya şifre';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/şifre ile kayıt şu anda devre dışı';
          break;
        case 'auth/weak-password':
          errorMessage = 'Şifre çok zayıf. En az 6 karakter olmalıdır';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Ağ hatası. İnternet bağlantınızı kontrol edin';
          break;
        default:
          errorMessage = 'Kayıt olurken bir hata oluştu';
      }
    }
    
    return { success: false, error: errorMessage };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

const authService = {
  loginWithEmail,
  signUpWithEmail,
  logout,
  onAuthStateChange,
  getCurrentUser,
};

export default authService;
