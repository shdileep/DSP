export type UjjwalTab = 'drivers' | 'bins' | 'tracking' | 'payroll' | 'news' | 'management';

export type BinStatus = 'Full' | 'Half Full' | 'Empty';
export type BinColor = 'red' | 'orange' | 'green';
export type PriorityLevel = 'High' | 'Medium' | 'Low';
export type DriverStatus = 'Active' | 'Inactive';
export type CollectionStatus = 'Pending' | 'Collected' | 'Skipped';

export interface BinItem {
  id: string;
  name: string;
  location: string;
  sector: string;
  fillPercentage: number;
  color: BinColor;
  status: BinStatus;
  x: number;
  y: number;
  distanceFromTruck: string;
  estimatedTime: string;
  priority: PriorityLevel;
  isIncludedInRoute: boolean;
  collectionStatus: CollectionStatus;
  capacityKg: number;
  lastCollected: string;
  sensorBattery: number;
}

export interface DriverItem {
  id: string;
  empId: string;
  name: string;
  avatar?: string;
  status: DriverStatus;
  isActive: boolean;
  lastActive: string;
  currentActivity: string;
  assignedTruck: string;
  currentLocation: string;
  phone: string;
  rating: number;
  shift: string;
  experience: string;
  completedTripsToday: number;
  leaveStatus?: 'None' | 'Pending' | 'Approved' | 'Rejected';
}

export interface TruckItem {
  id: string;
  truckNumber: string;
  driverId: string;
  driverName: string;
  model: string;
  fuelLevel: number;
  speed: number;
  currentTask: string;
  nextStop: string;
  distanceToNext: string;
  eta: string;
  totalDistance: string;
  routeProgress: number;
  status: 'Collecting' | 'En Route' | 'Idle' | 'Maintenance' | 'At Dump Yard';
  x: number;
  y: number;
  headingAngle: number;
  assignedRouteId: string;
}

export interface OperationalEventItem {
  id: string;
  title: string;
  description: string;
  category: 'Driver' | 'Truck' | 'Bin' | 'Route' | 'System';
  timestamp: string;
  relativeTime: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed' | 'Alert' | 'Info';
  driverName?: string;
  truckId?: string;
  binId?: string;
  location?: string;
  isLeaveRequest?: boolean;
  leaveDates?: string;
}

export interface PayrollRecord {
  id: string;
  empId: string;
  driverName: string;
  role: string;
  workingDays: number;
  totalDays: number;
  attendancePercent: number;
  overtimeHours: number;
  leaveDays: number;
  baseSalary: number;
  overtimePay: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'Processed' | 'Pending' | 'Paid';
  paymentDate: string;
  bankAccount: string;
  upiId: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'warning' | 'info' | 'success';
  time: string;
  read: boolean;
}
