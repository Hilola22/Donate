export enum VehicleType {
  BIKE = "bike",
  CAR = "car",
  SCOOTER = "scooter",
}

export class UpdateCourierDto {
  full_name?: string;
  phone_number?: string;
  vehicle_type?: VehicleType;
  vehicle_plate_number?: string;
  telegram_link?: string;
  is_active?: boolean;
}
