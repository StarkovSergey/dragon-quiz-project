import { instance } from '../../common/instance/instance'

export const packAPI = {
  getPack() {
    return instance.get('/cards/pack')
  },
}
