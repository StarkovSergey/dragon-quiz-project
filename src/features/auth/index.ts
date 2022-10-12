import { slice, login, logout, forgotPassword, updateProfile, setNewPassword, setRegisteredIn } from './auth-slice'
import * as authSelectors from './selectors'

const authReducer = slice.reducer

export { authSelectors, authReducer, login, logout, forgotPassword, updateProfile, setNewPassword, setRegisteredIn }
