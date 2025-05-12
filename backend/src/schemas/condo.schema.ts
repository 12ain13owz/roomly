import { boolean, object, string, TypeOf } from 'zod'

import { validationMessage } from '@/constants/message.const'

const register = object({
  body: object({
    fullName: string({
      required_error: validationMessage.registerCondo.fullName,
    }),
    phoneNumber: string({
      required_error: validationMessage.registerCondo.phoneNumber,
    }),
    email: string({
      required_error: validationMessage.registerCondo.email,
    }),
    lineId: string({
      required_error: validationMessage.registerCondo.lineId,
    }),
    address: string({
      required_error: validationMessage.registerCondo.address,
    }),
    subDistrict: string({
      required_error: validationMessage.registerCondo.subDistrict,
    }),
    district: string({
      required_error: validationMessage.registerCondo.district,
    }),
    province: string({
      required_error: validationMessage.registerCondo.province,
    }),
    postalCode: string({
      required_error: validationMessage.registerCondo.postalCode,
    }),
    terms: boolean({
      required_error: validationMessage.registerCondo.terms,
    }),
  }),
})

export const condoSchema = {
  register,
}

export type CondoType = {
  register: TypeOf<typeof condoSchema.register>['body']
}
