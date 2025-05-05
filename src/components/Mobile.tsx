"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GrPowerReset } from "react-icons/gr";
import { IoLogoWhatsapp } from "react-icons/io";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineInfo } from "react-icons/md";

export default function Mobile() {
  const weightArr = Array.from({ length: 111 }, (_, i) => 40 + i);
  const heightArr = Array.from({ length: 71 }, (_, i) => 140 + i);
  const ageArr = Array.from({ length: 100 }, (_, i) => 10 + i);
  const heartRateArr = Array.from({ length: 101 }, (_, i) => 40 + i);

  const activityLevels = [
    { value: "1.2", label: "Sedentary (little or no exercise)" },
    { value: "1.375", label: "Light (exercise 1-3 times a week)" },
    { value: "1.55", label: "Moderate (exercise 3-5 times a week)" },
    { value: "1.725", label: "Very Active (daily intense exercise)" },
    { value: "1.9", label: "Extra Active (intense physical job or training)" },
  ];

  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState<string>("");
  const [activity, setActivity] = useState<string>("");
  const [restingHR, setRestingHR] = useState<number | null>(null);

  const [result, setResult] = useState<{
    bmi?: number;
    bmr?: number;
    idealWeight?: number;
    targetHRMin?: number;
    targetHRMax?: number;
    caloricNeeds?: number;
  } | null>(null);

  const calculateFitness = () => {
    if (!weight || !height || !age || !gender || !activity) {
      return toast.error("All fields are required!");
    }

    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);

    const bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const activityFactor = parseFloat(activity);
    const caloricNeeds = bmr * activityFactor;

    const idealWeight =
      gender === "male"
        ? 50 + 0.91 * (height - 152.4)
        : 45.5 + 0.91 * (height - 152.4);

    const maxHR = 220 - age;
    const resting = restingHR || 70;
    const targetHRMin = ((maxHR - resting) * 0.5 + resting).toFixed(0);
    const targetHRMax = ((maxHR - resting) * 0.85 + resting).toFixed(0);

    setResult({
      bmi: +bmi.toFixed(1),
      bmr: +bmr.toFixed(0),
      idealWeight: +idealWeight.toFixed(1),
      targetHRMin: Number(targetHRMin),
      targetHRMax: Number(targetHRMax),
      caloricNeeds: +caloricNeeds.toFixed(0),
    });

    toast.success("Fitness details calculated!");
  };

  const resetValue = () => {
    setWeight(null);
    setHeight(null);
    setGender("");
    setAge(null);
    setActivity("");
    setRestingHR(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen  bg-black text-white py-6 px-4 flex flex-col items-center justify-center">
      <ShareComponent />
      <Card className="w-full max-w-md md:max-w-lg bg-zinc-900 border border-zinc-700 shadow-xl rounded-2xl">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-xl font-bold text-white">
            Fitness Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-2">
            <Label className="text-white">Weight (kg)</Label>
            <Select
              value={weight?.toString() || ""}
              onValueChange={(val) => setWeight(Number(val))}
            >
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select weight" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  {weightArr.map((w) => (
                    <SelectItem key={w} value={w.toString()}>
                      {w} kg
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-white">Height (cm)</Label>
            <Select
              value={height?.toString() || ""}
              onValueChange={(val) => setHeight(Number(val))}
            >
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select height" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  {heightArr.map((h) => (
                    <SelectItem key={h} value={h.toString()}>
                      {h} cm
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-white">Age</Label>
            <Select
              value={age?.toString() || ""}
              onValueChange={(val) => setAge(Number(val))}
            >
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select age" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  {ageArr.map((a) => (
                    <SelectItem key={a} value={a.toString()}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-white">Resting Heart Rate (optional)</Label>
            <Select
              value={restingHR?.toString() || ""}
              onValueChange={(val) => setRestingHR(Number(val))}
            >
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select heart rate" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  {heartRateArr.map((r) => (
                    <SelectItem key={r} value={r.toString()}>
                      {r} bpm
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-white">Activity Level</Label>
            <Select value={activity} onValueChange={(val) => setActivity(val)}>
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  {activityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-white">Gender</Label>
            <Select value={gender} onValueChange={(val) => setGender(val)}>
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center items-center gap-3">
            <Button
              className="w-[90%] bg-blue-600 hover:bg-blue-700 cursor-pointer"
              onClick={calculateFitness}
            >
              Calculate
            </Button>
            <GrPowerReset
              onClick={resetValue}
              className="w-fit text-white font-bold text-2xl cursor-pointer"
            />
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="bg-zinc-900 text-white p-4 mt-6 md:ml-10 rounded-lg border border-zinc-700 w-full md:max-w-sm text-center space-y-2">
          <p className="text-xl font-semibold text-blue-400">
            Your Fitness Details
          </p>
          <p>
            BMI: <span className="text-blue-400">{result.bmi}</span>
          </p>
          <p>
            Ideal Body Weight:{" "}
            <span className="text-blue-400">{result.idealWeight} kg</span>
          </p>
          <p>
            BMR: <span className="text-blue-400">{result.bmr} kcal/day</span>
          </p>
          <p>
            Caloric Needs:{" "}
            <span className="text-blue-400">
              {result.caloricNeeds} kcal/day
            </span>
          </p>
          <p>
            Target Heart Rate Zone:{" "}
            <span className="text-blue-400">
              {result.targetHRMin}–{result.targetHRMax} bpm
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
const ShareComponent = () => {
  const [isClicked, setIsClicked] = useState(false);
  const whatsappMessage = encodeURIComponent(
    "https://fitness-calculator-iota.vercel.app/"
  );

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div className="fixed bottom-20 right-4 z-10">
        <div className="relative group">
          <div
            className={`absolute bottom-0 right-0 w-[290px] px-4 pb-1 shadow-lg transition-opacity duration-300 ease-in-out ${
              isClicked ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <Link
              href={`https://wa.me/?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-green-600 text-white hover:bg-green-700 rounded-md p-2 transition-colors duration-300"
            >
              <IoLogoWhatsapp size={20} className="mr-2" />
              Share this on WhatsApp
            </Link>

            <Link
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-blue-600 text-white hover:bg-blue-700 rounded-md p-2 mt-1 transition-colors duration-300"
            >
              <FaPlusCircle size={20} className="mr-2" />
              Add this tool to your website
            </Link>
          </div>

          <MdOutlineInfo
            size={48}
            onClick={handleClick}
            className="cursor-pointer absolute right-0 transition-transform duration-300 transform hover:scale-110"
          />
        </div>
      </div>
    </>
  );
};
