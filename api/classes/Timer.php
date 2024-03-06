<?php
class Timer {
    private static $timers = [];

    public static function setInterval($f, $milliseconds, $game_id) {
        $timerId = $game_id;
        self::$timers[$timerId] = true;
        $seconds = (int)$milliseconds / 1000;
        while (self::$timers[$timerId]) {
            $f();
            sleep($seconds);
        }
    }

    public static function clearInterval($timerId) {
        unset(self::$timers[$timerId]);
    }
}