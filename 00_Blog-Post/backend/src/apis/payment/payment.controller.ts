import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IOAuthUser } from '../users/interface/user.req.auth';
import { PaymentInput } from './dto/paymentInput.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard('access'))
  @Post()
  createPointTransaction(
    @Body() input: PaymentInput,
    @Req() req: Request & IOAuthUser,
  ) {
    const currentUser = req.user;
    const { impUid, amount } = input;
    return this.paymentService.create({ impUid, amount, currentUser });
  }
}
