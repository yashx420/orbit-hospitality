import React from "react";
import {
  FaWheelchair,
  FaCity,
  FaFan,
  FaCheckCircle,
  FaParking,
  FaHotTub,
  FaPaw,
  FaSmoking,
  FaBabyCarriage,
  FaGlassCheers,
  FaDoorOpen,
  FaWind,
  FaBorderAll,
} from "react-icons/fa";
import {
  MdKitchen,
  MdLocalLaundryService,
  MdOutlineBalcony,
  MdOutlineIron,
  MdElevator,
  MdMicrowave,
  MdBlender,
  MdOutlineDining,
  MdCoffeeMaker,
  MdOutlineDesk,
} from "react-icons/md";
import {
  GiSoap,
  GiBroom,
  GiHanger,
  GiBed,
  GiToaster,
  GiCookingPot,
} from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import { BiCabinet, BiWifi } from "react-icons/bi";
import { PiTowel, PiDrop, PiBathtub } from "react-icons/pi";
import { LuUtensils, LuMonitor } from "react-icons/lu";
import { CgSmartHomeRefrigerator } from "react-icons/cg";

export const getAmenityIcon = (
  amenityName: string,
  className: string = "w-5 h-5 text-orbit-gold flex-shrink-0 mt-0.5",
) => {
  const name = amenityName.toLowerCase().trim();

  // Basic map
  const renderIcon = (IconComponent: React.ElementType) => {
    return <IconComponent className={className} />;
  };

  if (
    name.includes("shower gel") ||
    name.includes("soap") ||
    name.includes("shampoo")
  )
    return renderIcon(GiSoap);
  if (name.includes("refrigerator") || name.includes("fridge"))
    return renderIcon(CgSmartHomeRefrigerator);
  if (name.includes("washing machine") || name.includes("washer"))
    return renderIcon(MdLocalLaundryService);
  if (name.includes("toaster")) return renderIcon(GiToaster);
  if (
    name.includes("family") ||
    name.includes("kids") ||
    name.includes("children")
  )
    return renderIcon(FaBabyCarriage);
  if (name.includes("wheelchair") || name.includes("accessibility"))
    return renderIcon(FaWheelchair);
  if (name.includes("city view")) return renderIcon(FaCity);
  if (name.includes("cleaning products") || name.includes("broom"))
    return renderIcon(GiBroom);
  if (name.includes("chimney") || name.includes("exhaust"))
    return renderIcon(FaFan);
  if (name.includes("clothes rack") || name.includes("hanger"))
    return renderIcon(GiHanger);
  if (
    name.includes("storage space") ||
    name.includes("cabinet") ||
    name.includes("wardrobe")
  )
    return renderIcon(BiCabinet);
  if (name.includes("air conditioning") || name.includes("ac"))
    return renderIcon(TbAirConditioning);
  if (name.includes("bathroom") || name.includes("bathtub"))
    return renderIcon(PiBathtub);
  if (name.includes("balcony") || name.includes("terrace"))
    return renderIcon(MdOutlineBalcony);
  if (name.includes("crockery") || name.includes("cutlery"))
    return renderIcon(LuUtensils);
  if (name.includes("ceiling fan") || name.includes("fan"))
    return renderIcon(FaFan);
  if (
    name.includes("designated smoking area") ||
    name.includes("smoking allowed") ||
    name.includes("smoker")
  )
    return renderIcon(FaSmoking);
  if (name.includes("parking") || name.includes("garage"))
    return renderIcon(FaParking);
  if (name.includes("gas stove") || name.includes("stove"))
    return renderIcon(GiCookingPot);
  if (name.includes("ironing board")) return renderIcon(MdOutlineIron);
  if (name.includes("iron")) return renderIcon(MdOutlineIron);
  if (name.includes("kettle") || name.includes("coffee maker"))
    return renderIcon(MdCoffeeMaker);
  if (name.includes("laptop workspace") || name.includes("desk"))
    return renderIcon(MdOutlineDesk);
  if (
    name.includes("cable tv") ||
    name.includes("tv") ||
    name.includes("television")
  )
    return renderIcon(LuMonitor);
  if (name.includes("towels") || name.includes("towel"))
    return renderIcon(PiTowel);
  if (name.includes("washbasin with mirror") || name.includes("mirror"))
    return renderIcon(FaBorderAll);
  if (name.includes("washbasin") || name.includes("sink"))
    return renderIcon(PiDrop);
  if (name.includes("elevator") || name.includes("lift"))
    return renderIcon(MdElevator);
  if (name.includes("no parties") || name.includes("no events"))
    return renderIcon(FaGlassCheers); // We might want a crossed out version, but this works for now or FaBan
  if (name.includes("private entrance") || name.includes("door"))
    return renderIcon(FaDoorOpen);
  if (
    name.includes("bed linens") ||
    name.includes("bedding") ||
    name.includes("bed linen") ||
    name.includes("bed")
  )
    return renderIcon(GiBed);
  if (
    name.includes("internet") ||
    name.includes("wifi") ||
    name.includes("wi-fi")
  )
    return renderIcon(BiWifi);
  if (
    name.includes("cookware") ||
    name.includes("kitchen utensils") ||
    name.includes("pots")
  )
    return renderIcon(GiCookingPot);
  if (name.includes("blender") || name.includes("mixer"))
    return renderIcon(MdBlender);
  if (name.includes("kitchen")) return renderIcon(MdKitchen);
  if (name.includes("dining table") || name.includes("dining"))
    return renderIcon(MdOutlineDining);
  if (name.includes("hair dryer") || name.includes("dryer"))
    return renderIcon(FaWind);
  if (
    name.includes("hot water") ||
    name.includes("geyser") ||
    name.includes("heater")
  )
    return renderIcon(FaHotTub);
  if (name.includes("microwave") || name.includes("oven"))
    return renderIcon(MdMicrowave);
  if (
    name.includes("no pets allowed") ||
    name.includes("no pet") ||
    name.includes("pets not allowed")
  )
    return renderIcon(FaPaw); // Or a crossed out paw

  // Default fallback
  return renderIcon(FaCheckCircle);
};
