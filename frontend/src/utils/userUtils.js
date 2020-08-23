import Config from '@configs/'

class UserUtils {
  getUser() {
    return JSON.parse(sessionStorage.getItem(Config.ObjectSession))
  }
  
  getPermission() {
    const user = this.getUser() || {}
    return user.type
  }
}

export default new UserUtils()
