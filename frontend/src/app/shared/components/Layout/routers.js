export default [
  {
    icon: 'message',
    router: '/',
    name: 'SIDERBAR_CHAT',
    permission: ['cliente', 'admin', 'agente', 'manager']
  },
  {
    icon: 'dashbord',
    router: '/report',
    name: 'SIDERBAR_DASHBORD',
    permission: ['cliente', 'admin', 'manager']
  },
  {
    icon: 'users',
    router: '/users',
    name: 'SIDERBAR_USERS',
    permission: ['cliente', 'admin', 'manager']
  },
  {
    icon: 'settings',
    router: '/channel',
    name: 'SIDERBAR_SETTINGS',
    permission: ['cliente', 'admin', 'manager']
  },
  {
    icon: 'sales',
    router: '/clients',
    permission: ['master'],
    name: 'SIDERBAR_SETTINGS'
  }
]
