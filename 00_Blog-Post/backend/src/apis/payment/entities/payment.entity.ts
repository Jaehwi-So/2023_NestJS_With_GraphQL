import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PAYMENT_TRANSACTION_STATUS_ENUM } from '../enum/paymentStatus.enum';

// 보통 Insert Only Table, 상태가 바뀌면 변경을 하는것이 아니라 추가를 하여 결제 히스토리를 추적한다.
@Entity()
export class Payment {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  impUid: string;

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: PAYMENT_TRANSACTION_STATUS_ENUM })
  status: string;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
