-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 24, 2025 at 08:09 PM
-- Server version: 9.2.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation_tagging`
--
CREATE DATABASE IF NOT EXISTS `vacation_tagging` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci;
USE `vacation_tagging`;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `follow_id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `vacation_id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `role` enum('user','admin') COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacation_id` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `vacation_destination` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `vacation_description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `vacation_date_start` datetime NOT NULL,
  `vacation_date_end` datetime NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `img_file_name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacation_id`, `vacation_destination`, `vacation_description`, `vacation_date_start`, `vacation_date_end`, `price`, `img_file_name`, `created_at`, `updated_at`) VALUES
('9d239d2f-07fd-11f0-a077-0242ac110002', 'Seychelles Islands\r\n\r\n\r\n\r\n', 'In the heart of a vast nature reserve, on the shores of a breathtaking lagoon, lies one of the most sought-after and unique hotels on Mahé Island in the Seychelles. Ephelia, part of the prestigious Constance group, offers Spirit guests an exclusive and cost-effective package that embodies the ultimate Seychellois experience. In the expansive resort grounds, endless possibilities await to enjoy a little slice of heaven in maximum privacy: surrounded by the wild nature on all sides, in the luxurious spa by Shiseido, at the diving sites, and with the wide variety of activities offered for couples, families, and children of all ages. The high hospitality standards of the Constance group, along with the authentic luxury of rooms embedded in nature (some with private pools), make every stay at Ephelia an unforgettable experience for all.', '2025-04-07 17:38:58', '2025-04-13 17:38:58', 3520, 'ephelia-seychelles', '2025-03-23 17:38:58', '2025-03-23 17:38:58'),
('9d23f789-07fd-11f0-a077-0242ac110002', 'Mauritius Island', 'The uncompromising hospitality experience, like at all the hotels in the chain, also in Mauritius, sets a new standard for the sought-after combination of luxury, hospitality, and exoticism. Marriott chose the impressive and unique location at the southwestern tip, at Le Morne Beach, overlooking the famous Le Morne mountain, near the beach beloved by kite surfers from around the world. The stunning colonial-style hotel, located on a UNESCO World Heritage site, offers luxurious villas and suites for couples and families, alongside elegant rooms in a renovated historic colonial building, all with dramatic views of Le Morne mountain and the ocean. The exclusive sports club invites guests to experience nearly every possible water activity. Hotel guests will also enjoy the unique luxury spa experience found at the chain’s hotels, as well as meticulously crafted gastronomy at each of the hotel’s gourmet restaurants, including a chef’s restaurant, a grill bar, a seafood restaurant, and an Asian restaurant.', '2025-04-14 17:38:58', '2025-04-20 17:38:58', 3950, 'Mauritius-Island', '2025-03-23 15:38:58', '2025-03-23 15:38:58'),
('a15163c2-08eb-11f0-a077-0242ac110002', 'Crete', 'The Bali Star Hotel is located on the \'Bali\' peninsula, one of the most tranquil and unspoiled areas in Crete. This quiet, less touristy region is ideal for travelers seeking a relaxing beach vacation away from the crowded and noisy coastal towns. The hotel features a restaurant serving breakfast and dinner, focusing on authentic Greek cuisine made with fresh, local ingredients. Just a few steps away lies Bali Beach, renowned for its golden, powdery sands and crystal-clear turquoise waters.', '2025-05-08 20:51:30', '2025-05-11 20:51:30', 585, 'crete', '2025-03-24 18:50:54', '2025-03-24 18:50:54'),
('a151b59f-08eb-11f0-a077-0242ac110002', 'Corfu', 'The San Antonio Corfu Resort is located just 20 meters from Kalami Beach and features two swimming pools, offering rooms and suites with stunning views of the Ionian Sea. Free Wi-Fi is available throughout the property.\r\nAll rooms and suites open onto a balcony and include air conditioning, a TV, and a minibar or refrigerator. Each unit also has a private bathroom with a shower, toiletries, and a hairdryer.\r\nGuests can start their day with a buffet breakfast featuring fresh local ingredients. They can also indulge in culinary delights at the on-site restaurant or enjoy a cocktail at the pool bar or the all-day beachfront bar.', '2025-05-22 20:51:30', '2025-05-25 20:51:30', 876, 'corfu', '2025-03-24 18:50:54', '2025-03-24 18:50:54'),
('a151cae1-08eb-11f0-a077-0242ac110002', 'Dubai', 'Palm Island is one of Dubai\'s most impressive areas. This artificial, palm tree-shaped island is a symbol of the city, featuring massive luxury hotels and resorts, upscale residences, and a variety of entertainment options. Among its top attractions are the Aquaventure Water Park at Atlantis Hotel, the Atlantis Aquarium, and the spectacular Palm Fountain. The area is perfect for a relaxing beach vacation, with easy access to other attractions via the monorail or taxi.', '2025-06-29 20:51:30', '2025-07-04 20:51:30', 908, 'dubai', '2025-03-24 18:50:54', '2025-03-24 18:50:54'),
('a151d579-08eb-11f0-a077-0242ac110002', 'Athens', 'The Metaxourgio neighborhood may lie outside the core of Athens\' old town and the historic center around the Acropolis, but it offers a rich artistic and cultural scene. While it may not be the city\'s most famous area, it boasts a variety of galleries, fashion boutiques, museums, high-quality restaurants, and cafés. The neighborhood exudes a vibrant and creative atmosphere, with unique graffiti art decorating its streets. Just a short walk away, you\'ll find yourself in the heart of Athens\' ancient and historic district.', '2025-06-09 20:51:30', '2025-06-13 20:51:30', 703, 'Athens', '2025-03-24 18:50:54', '2025-03-24 18:50:54'),
('a151e09e-08eb-11f0-a077-0242ac110002', 'Phuket', 'Located in Patong, this hotel is just 0.6 km from Tri Trang Beach and within 5 km of Patong Beach and Bangla Road. Simon Cabaret and Jungceylon Shopping Center are also within the same distance. ATMOS, the main restaurant, offers an original menu and beverages, including healthy recipes. Open for breakfast, lunch, and dinner, it is the perfect spot for any gourmet enthusiast who appreciates the fusion of East and West flavors. The hotel features an outdoor pool and two bars/lounges. Free Wi-Fi is available in public areas, and complimentary self-parking is provided. Additional amenities include a fitness center, a poolside bar, and 24-hour room service.\r\n', '2025-03-24 18:50:54', '2025-12-23 20:51:30', 2240, 'Phuket', '2025-12-14 20:51:30', '2025-03-24 18:50:54'),
('a151eba9-08eb-11f0-a077-0242ac110002', 'Miami Beach', 'This historic oceanfront hotel features a private beach area and on-site dining options. There are 4 swimming pools including an adult exclusive rooftop pool available at 1 Hotel South Beach. A tablet with daily digital newspapers comes standard in every room as does a 55-inch smart flat-screen TV. A mini bar in-room water filtration system and espresso machine with organic coffee are included. 1 Hotel South Beach guests can access the on-site fitness center and spa and wellness center. Guests looking for adventure can enjoy watersports activities while kids can explore the children\'s club activities. Four on-site snack and beverage bars as well as 24-hour in-room dining are available. Shopping at Lincoln Road Mall is 0.7 mi away from this hotel. Guests will be 5 minutes’ drive from the nightlife and dining of South Beach city center.\r\n', '2025-04-21 20:51:30', '2025-04-27 20:51:30', 7196, 'miami', '2025-03-24 18:50:54', '2025-03-24 18:50:54'),
('a151f6c4-08eb-11f0-a077-0242ac110002', 'Rhodes', 'The resort offers a peaceful family-friendly stay, with rooms suitable for families or couples. It features a large outdoor pool with sun umbrellas, lounge chairs, and a poolside bar, as well as a separate children\'s pool. Guests can enjoy a buffet-style breakfast, a restaurant serving Mediterranean cuisine, pizzas, and pasta, and several bars.\r\nThe hotel provides various activities, including water sports at nearby beaches, a kids\' club, billiards, table tennis, and entertainment programs throughout the day and evening. Free Wi-Fi is available throughout the property.\r\nLocated in a quiet area of Faliraki, the guesthouse is about 1.5 km from the town center, where visitors can find shops, bars, and restaurants. Kathara Beach is just 500 meters away, while the Mandomata nudist beach is approximately 600 meters from the hotel. The historic center of Rhodes Town is about 12 km away, and the airport is roughly 18 km from the property.', '2025-04-24 20:51:30', '2025-04-27 20:51:30', 473, 'Rhodes', '2025-03-24 18:50:54', '2025-03-24 18:50:54'),
('a1524ed0-08eb-11f0-a077-0242ac110002', 'Ayia Napa', 'The Atlantica Hotels Cyprus family warmly welcomes you to the Atlantica Anya Hotel. There are plenty of beach hotels, but the Atlantica Anya Hotel is an excellent choice to fulfill all your needs and expectations. Book with us and discover the difference. Enjoy access to wireless internet to stay connected during your stay. Delight in a delectable dinner at the full-service restaurant, and experience the vibrant atmosphere of our bar in great company. Each of our rooms is equipped with a minibar stocked with delicious items, a hairdryer for your convenience, and air conditioning for maximum comfort. For your entertainment, every room includes a television for visual and audio entertainment, a radio, and a pay-TV service with a wide selection of fun programs. For your convenience and security, all rooms include a safe for storing valuables, a functioning phone, and a hairdryer in every bathroom. Additionally, the hotel offers accessible rooms tailored to the needs of guests with disabilities. We look forward to making your stay an exceptional experience.', '2025-04-13 20:51:30', '2025-04-17 20:51:30', 546, 'Ayia Napa', '2025-03-24 18:50:54', '2025-03-24 18:50:54'),
('a1526267-08eb-11f0-a077-0242ac110002', 'Limassol', 'NYX Limassol Hotel embodies the unique and vibrant energy of the special Cypriot city, offering an exceptional hospitality experience for both tourists looking to indulge in authentic Cypriot hospitality and business professionals visiting for work trips. The hotel is located in the old city of Limassol, facing a beautiful beach, the romantic harbor with its famous marina, and the medieval Limassol Castle, all enveloping you in cultural richness and a wonderful authentic urban atmosphere. NYX Limassol reflects a unique lifestyle hospitality concept that will ignite a strong passion for freedom, release, and self-expression, free from stress and pressure. The bold, stylish, and classic design of the hotel, the tastefully designed furniture, the inspiring elements, and the stunning color palette will further enhance your Cypriot experience in Limassol. All these elements are felt throughout the hotel, especially in the 189 guest rooms and luxurious suites. After a day filled with fascinating experiences across the city, you are more than welcome to relax with a selection of great drinks at the hotel bar and restaurant, which overlook the beautiful and endless sea view. NYX Limassol redefines the hospitality experience and invites you to join an unforgettable Cypriot adventure.', '2025-03-24 18:50:54', '2025-05-04 20:51:30', 875, 'Limassol', '2025-03-24 18:50:54', '2025-03-24 18:50:54'),
('ddd21666-07fe-11f0-a077-0242ac110002', 'The Dominican Republic\r\n', 'An oasis of pleasures for the body and soul awaits you at the elegant boutique hotel \"Zoetry,\" featuring luxurious suites designed with Caribbean inspiration, exclusively for adult guests in Punta Cana. In the heart of wild nature, stretching out in front of a picturesque beach, you will discover an endless array of delights and indulgences in an intimate and exclusive atmosphere: heavenly cuisine at each of the 5 restaurants, overseen by renowned international chefs, moments of magical tranquility by the stunning pool that crosses the hotel and winds through its beautiful gardens down to the beach, cocktails and fine wines at breathtaking sunsets, a luxurious spa and wellness center, and impeccable service. The rich activity program includes, among other things, a billiard club, yoga and dance lessons, horseback riding against the scenic landscape, snorkeling and diving at the water sports club, and many others.', '2025-04-24 17:48:40', '2025-05-01 17:48:40', 3890, 'the-dominican-republic', '2025-03-23 15:48:39', '2025-03-23 15:48:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`follow_id`),
  ADD KEY `vacation_id` (`vacation_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacation_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`vacation_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
