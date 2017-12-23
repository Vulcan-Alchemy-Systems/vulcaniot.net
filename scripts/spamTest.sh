#!/usr/bin/env bash
echo "this script will spam the local mqtt with beaglebone/id events at ~10hz"
declare -a array=("ok" "warning" "emergency")
while true
do
  sleep 0.1
  for((i=50; i>=1; i--))
  do
     echo "sensor/$i" -m "${array[$(($RANDOM % 2))]}"
     mosquitto_pub -h localhost -p 1883 -t "sensor/$i" -m "${array[$(($RANDOM % 3))]}"
     mosquitto_pub -h localhost -p 1883 -t "info" -m "{sensor: "sensor/$i", status: "${array[$(($RANDOM % 3))]}"}"
  done
done
