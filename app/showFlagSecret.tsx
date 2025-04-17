import React from 'react';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

// Hardcoded secret message (flag)
const SECRET_FLAG = "FLAG{H3RM3S_R3VERS1NG_CH4LL3NGE_C0MPL3T3D}";

const handleGoBack = () => {
    router.replace('/');
};


export default function SecretScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <Text style={styles.title}>Congratulations!</Text>
                    <Text style={styles.subtitle}>
                        You've successfully authenticated and found the secret flag:
                    </Text>

                    <View style={styles.flagContainer}>
                        <Text style={styles.flag}>{SECRET_FLAG}</Text>
                    </View>

                    <Text style={styles.info}>
                        This flag demonstrates a successful reverse engineering of a Hermes React Native application.
                    </Text>

                    <Text style={styles.detail}>
                        The password verification was performed client-side by hashing the
                        input and comparing it with a hardcoded hash value stored in the app.
                    </Text>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleGoBack}
                    >
                        <Text style={styles.backButtonText}>Back to Login</Text>
                    </TouchableOpacity>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 40,
        paddingBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2E7D32',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
        color: '#555',
    },
    flagContainer: {
        padding: 20,
        backgroundColor: '#E8F5E9',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#A5D6A7',
        marginBottom: 30,
        width: '100%',
        alignItems: 'center',
    },
    flag: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E7D32',
        textAlign: 'center',
    },
    info: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 24,
    },
    detail: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 40,
    },
    backButton: {
        backgroundColor: '#2E7D32',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
