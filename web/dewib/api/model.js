import { Model } from '@dewib/dw-api/utils'

export default class ApiModel extends Model {
  handleRequest (context) {
    context.url = `http://localhost:3005/${context.url}`
    return super.handleRequest(context)
  }
}
