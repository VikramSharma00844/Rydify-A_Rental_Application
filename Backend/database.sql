-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2025 at 06:37 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rent_vehicle`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT 'Super Admin',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 'sourav mourya', 'souravmourya203@gmail.com', '123', 'Super Admin', '2025-03-05 12:37:59', '2025-03-08 12:08:46'),
(7, 'Hirday', 'hirdaymahajan@gmail.com', 'CvlslIW8', 'Admin', '2025-03-18 07:32:59', '2025-03-18 07:32:59');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `vehicleId` int(11) NOT NULL,
  `dealerId` int(11) NOT NULL,
  `with_driver` varchar(255) NOT NULL,
  `driverId` varchar(255) DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `days` int(11) NOT NULL,
  `pickup_location` varchar(255) NOT NULL,
  `dropoff_location` varchar(255) NOT NULL,
  `total_price` int(11) NOT NULL,
  `adharcard` varchar(255) NOT NULL,
  `driving_licence` varchar(255) NOT NULL,
  `booking_status` varchar(255) NOT NULL DEFAULT 'Pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `userId`, `vehicleId`, `dealerId`, `with_driver`, `driverId`, `start_date`, `end_date`, `days`, `pickup_location`, `dropoff_location`, `total_price`, `adharcard`, `driving_licence`, `booking_status`, `createdAt`, `updatedAt`) VALUES
(13, 1, 6, 3, 'yes', '1', '2025-03-28 00:00:00', '2025-03-30 00:00:00', 2, 'NovaRide,Court Road,Bangalore', 'NovaRide,GT Road,Mumbai', 5000, '234354563245', '/userDL/driver2.jpg', 'Cancelled', '2025-03-21 05:31:00', '2025-03-21 05:36:33'),
(14, 1, 5, 3, 'yes', '2', '2025-03-27 00:00:00', '2025-03-29 00:00:00', 2, 'NovaRide,Court Road,Amritsar', 'NovaRide,Court Road,Ludhiana', 6400, '124325435234', '/userDL/driver.jpg', 'Cancelled', '2025-03-21 05:32:40', '2025-03-21 05:36:40'),
(15, 1, 9, 3, 'yes', '4', '2025-03-26 00:00:00', '2025-03-29 00:00:00', 3, 'NovaRide,GT Road,Hyderabad', 'NovaRide,Court Road,Bathinda', 4500, '325534443443', '/userDL/bike.jpg', 'Cancelled', '2025-03-21 05:33:40', '2025-03-21 05:36:47');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `photo`, `createdAt`, `updatedAt`) VALUES
(1, 'car', '/categoryPic/car.jpeg', '2025-03-06 12:07:51', '2025-03-06 12:07:51'),
(2, 'bike', '/categoryPic/bike.jpeg', '2025-03-06 12:08:09', '2025-03-06 12:08:09'),
(4, 'Activa', '/categoryPic/scooty.jpeg', '2025-03-06 12:34:27', '2025-03-06 12:34:27');

-- --------------------------------------------------------

--
-- Table structure for table `dealers`
--

CREATE TABLE `dealers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `adhar_card` varchar(255) NOT NULL,
  `pan_card` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Inactive',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dealers`
--

INSERT INTO `dealers` (`id`, `name`, `email`, `password`, `adhar_card`, `pan_card`, `mobile`, `gender`, `photo`, `address`, `city`, `status`, `createdAt`, `updatedAt`) VALUES
(3, 'Sourav Maurya', 'souravmourya203@gmail.com', '123', '123456785463632', 'HB12345DGT', '07009057835', 'male', '/dealersPic/profilePic.jpg', 'L-7/2842 muraby wali gali tarn taran road', 'Amritsar', 'Active', '2025-03-06 06:35:15', '2025-03-12 11:31:25');

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dl` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `rent_per_day` int(11) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Available',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`id`, `name`, `dl`, `photo`, `rent_per_day`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Hirday', 'PB02123AC', '/driverPic/driver.jpg', 4000, 'Available', '2025-03-18 06:32:23', '2025-03-21 05:36:33'),
(2, 'Mohit', 'PB0230022', '/driverPic/driver2.jpg', 3000, 'Available', '2025-03-18 06:33:36', '2025-03-21 05:36:40'),
(4, 'rohit', '34534644252', '/driverPic/driver3.jpg', 1000, 'Available', '2025-03-18 09:46:23', '2025-03-21 05:36:47');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `vehicleId` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `feedback` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `userId`, `vehicleId`, `rating`, `feedback`, `createdAt`, `updatedAt`) VALUES
(1, 1, 6, 3, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one ', '2025-03-13 06:58:52', '2025-03-13 06:58:52'),
(2, 1, 5, 5, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, yo', '2025-03-13 06:59:41', '2025-03-13 06:59:41'),
(3, 1, 5, 5, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, co', '2025-03-13 07:01:17', '2025-03-13 07:01:17'),
(4, 1, 6, 2, 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form', '2025-03-13 07:01:37', '2025-03-13 07:01:37'),
(5, 1, 6, 3, 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form', '2025-03-13 07:02:02', '2025-03-13 07:02:02'),
(6, 1, 8, 4, 'good', '2025-03-19 06:12:24', '2025-03-19 06:12:24');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `mobile`, `gender`, `photo`, `address`, `city`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Sourav', 'Mourya', 'souravmourya203@gmail.com', '123', '07009057835', 'male', '/usersPic/profilePic.jpg', 'Ajit Nagar', 'Jalandhar', 'Active', '2025-03-05 12:58:12', '2025-03-08 12:08:09');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `vehicle_brand` varchar(255) NOT NULL,
  `vehicle_model` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `car_photo` varchar(255) NOT NULL,
  `rc` varchar(255) NOT NULL,
  `insurance` varchar(255) NOT NULL,
  `pollution` varchar(255) NOT NULL,
  `rent_per_day` int(11) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Available',
  `seat` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `dealerId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `name`, `vehicle_brand`, `vehicle_model`, `description`, `car_photo`, `rc`, `insurance`, `pollution`, `rent_per_day`, `status`, `seat`, `categoryId`, `dealerId`, `createdAt`, `updatedAt`) VALUES
(2, 'Honda City', 'Honda', '2022', 'Fully Automatic,Petrol', '/veh_documents/honda_city.jpeg', '/veh_documents/rc.jpeg', '/veh_documents/insurance4.jpg', '/veh_documents/pollution.jpeg', 2500, 'Available', 5, 1, 3, '2025-03-07 10:02:05', '2025-03-20 09:58:08'),
(5, 'Swift', 'Maruti Suzuki', '2023', 'Fully Automatic Car,Petrol', '/veh_documents/swift.jpeg', '/veh_documents/rc.jpeg', '/veh_documents/insurance4.jpg', '/veh_documents/pollution.jpeg', 2200, 'Available', 5, 1, 3, '2025-03-07 10:13:32', '2025-03-21 05:36:40'),
(6, 'Pulsar ns 160', 'Bajaj', '2025', 'Sportz Bike', '/veh_documents/puslar_ns160.jpeg', '/veh_documents/rc.jpeg', '/veh_documents/insurance4.jpg', '/veh_documents/pollution.jpeg', 1500, 'Available', 2, 2, 3, '2025-03-07 10:14:44', '2025-03-21 05:36:33'),
(7, 'RS200', 'Bajaj', '2024', 'Sportz Bike', '/veh_documents/rs200.jpeg', '/veh_documents/rc.jpeg', '/veh_documents/insurance4.jpg', '/veh_documents/pollution.jpeg', 1500, 'Available', 2, 2, 3, '2025-03-07 10:21:22', '2025-03-21 05:20:37'),
(8, 'Splender', 'Hero', '2025', 'Good BIke', '/veh_documents/splender.jpeg', '/veh_documents/rc.jpeg', '/veh_documents/insurance4.jpg', '/veh_documents/pollution.jpeg', 800, 'Available', 2, 2, 3, '2025-03-07 10:22:47', '2025-03-20 11:18:27'),
(9, 'Activa 7G', 'Honda', '2025', '60', '/veh_documents/activaproject.jpg', '/veh_documents/rc.jpeg', '/veh_documents/insurance4.jpg', '/veh_documents/pollution.jpeg', 500, 'Available', 2, 4, 3, '2025-03-12 07:57:39', '2025-03-21 05:36:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `vehicleId` (`vehicleId`),
  ADD KEY `dealerId` (`dealerId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dealers`
--
ALTER TABLE `dealers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `vehicleId` (`vehicleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `dealerId` (`dealerId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `dealers`
--
ALTER TABLE `dealers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`dealerId`) REFERENCES `dealers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_2` FOREIGN KEY (`dealerId`) REFERENCES `dealers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
